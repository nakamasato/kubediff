const core = require('@actions/core');
const github = require('@actions/github');

const FILES          = new Set();
const FILES_ADDED    = new Set();
const FILES_MODIFIED = new Set();
const FILES_REMOVED  = new Set();
const FILES_RENAMED  = new Set();

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  const ref = github.context.ref
  console.log(`ref: ${ref}`);
  const pull_request = JSON.stringify(github.context.payload.pull_request, undefined, 2)
  console.log("--------------------------------");
  console.log(`The event pull: ${pull_request}`);
} catch (error) {
  core.setFailed(error.message);
}