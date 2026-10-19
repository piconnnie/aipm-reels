#!/usr/bin/env node
// Minimal stand-in for the GitHub CLI used by the workflow tests. Supports only
// the gh sub-commands the AIPM workflows call. State lives in $GH_FAKE_STATE
// (JSON); release assets are copied into $GH_FAKE_RELEASES/<tag>/.
import fs from 'node:fs';
import path from 'node:path';

const statePath = process.env.GH_FAKE_STATE;
const relDir = process.env.GH_FAKE_RELEASES;
const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : {prs: [], releases: {}, labels: [], issues: [], secrets: {}, log: []};
const save = () => fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
const argv = process.argv.slice(2);
state.log.push(argv.join(' '));

const flag = (name) => {
  const i = argv.indexOf(`--${name}`);
  if (i >= 0) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith(`--${name}=`));
  return eq ? eq.split('=').slice(1).join('=') : undefined;
};
const positional = () => {
  const out = [];
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      if (!argv[i].includes('=') && !['--prerelease', '--clobber', '--force'].includes(argv[i])) i++;
      continue;
    }
    out.push(argv[i]);
  }
  return out;
};
const done = (out = '', code = 0) => {
  save();
  if (out) process.stdout.write(out + '\n');
  process.exit(code);
};

const jq = (data, expr) => {
  if (!expr) return JSON.stringify(data);
  if (expr === 'length') return String(data.length);
  if (expr === '.[].headRefName') return data.map((p) => p.headRefName).join('\n');
  if (expr === '.[0].number // empty') return data[0] ? String(data[0].number) : '';
  throw new Error(`fake gh: unsupported --jq ${expr}`);
};

const [group, cmd] = argv;
if (group === 'pr') {
  if (cmd === 'list') {
    let prs = state.prs;
    const st = flag('state') ?? 'open';
    prs = prs.filter((p) => p.state === st);
    if (flag('label')) prs = prs.filter((p) => p.labels.includes(flag('label')));
    if (flag('head')) prs = prs.filter((p) => p.headRefName === flag('head'));
    done(jq(prs.map((p) => ({number: p.number, headRefName: p.headRefName})), flag('jq')));
  }
  if (cmd === 'create') {
    const number = state.prs.length + 1;
    state.prs.push({number, state: 'open', headRefName: flag('head'), title: flag('title'), body: fs.readFileSync(flag('body-file'), 'utf8'), labels: (flag('label') ?? '').split(',').filter(Boolean), comments: []});
    done(`https://github.com/fake/repo/pull/${number}`);
  }
  if (cmd === 'edit') {
    const pr = state.prs.find((p) => p.number === Number(positional()[0]));
    pr.body = fs.readFileSync(flag('body-file'), 'utf8');
    pr.edits = (pr.edits ?? 0) + 1;
    done();
  }
  if (cmd === 'comment') {
    const pr = state.prs.find((p) => p.number === Number(positional()[0]));
    pr.comments.push(flag('body'));
    done();
  }
}
if (group === 'label' && cmd === 'create') {
  const name = positional()[0];
  if (!state.labels.includes(name)) state.labels.push(name);
  done();
}
if (group === 'release') {
  const [tag, ...files] = positional();
  const dir = path.join(relDir, tag ?? '');
  if (cmd === 'view') done('', state.releases[tag] ? 0 : 1);
  if (cmd === 'create') {
    if (state.releases[tag]) done(`release ${tag} already exists`, 1);
    fs.mkdirSync(dir, {recursive: true});
    for (const f of files) fs.copyFileSync(f, path.join(dir, path.basename(f)));
    state.releases[tag] = {prerelease: argv.includes('--prerelease'), title: flag('title'), files: files.map((f) => path.basename(f))};
    done(`https://github.com/fake/repo/releases/tag/${tag}`);
  }
  if (cmd === 'upload') {
    if (!state.releases[tag]) done('release not found', 1);
    for (const f of files) {
      if (fs.existsSync(path.join(dir, path.basename(f))) && !argv.includes('--clobber')) done('asset exists', 1);
      fs.copyFileSync(f, path.join(dir, path.basename(f)));
    }
    state.releases[tag].uploads = (state.releases[tag].uploads ?? 0) + 1;
    done();
  }
  if (cmd === 'download') {
    if (!state.releases[tag]) done('release not found', 1);
    const pattern = flag('pattern');
    const out = flag('dir') ?? '.';
    fs.mkdirSync(out, {recursive: true});
    fs.copyFileSync(path.join(dir, pattern), path.join(out, pattern));
    done();
  }
  if (cmd === 'edit') {
    const pre = argv.find((a) => a.startsWith('--prerelease'));
    if (pre) state.releases[tag].prerelease = pre !== '--prerelease=false';
    if (flag('title')) state.releases[tag].title = flag('title');
    done();
  }
}
if (group === 'issue' && cmd === 'create') {
  state.issues.push({title: flag('title')});
  done('https://github.com/fake/repo/issues/1');
}
if (group === 'secret' && cmd === 'set') {
  state.secrets[positional()[0]] = fs.readFileSync(0, 'utf8').length;
  done();
}
done(`fake gh: unsupported command: ${argv.join(' ')}`, 2);
