const { execSync } = require('child_process');
try {
  let out = execSync('npx @open-gitagent/gitagent validate', {
    env: {...process.env, FORCE_COLOR: '0'},
    encoding: 'utf8'
  });
  console.log(out);
} catch (e) {
  console.log("STDOUT:", e.stdout);
  console.log("STDERR:", e.stderr);
}
