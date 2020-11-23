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
  const action = JSON.stringify(github.context.payload.action, undefined, 2)
  console.log(`action: ${action}`);
  const payload = JSON.stringify(github.context.payload.pull_request.base.ref, undefined, 2)
  const ref = github.context.ref
  console.log(`ref: ${ref}`);
  console.log("--------------------------------");
  console.log(`The event pull: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}