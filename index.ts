const core = require('@actions/core');
import {context} from '@actions/github'

// Workaround for @actions/github until @octokit/graphql v4 is used
declare module '@octokit/graphql' {
  type GraphQlQueryResponse = unknown;
  type Variables = unknown;
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  let base: string | undefined
  let head: string | undefined
  const eventName = context.eventName

  switch (eventName) {
    case 'pull_request':
      base = context.payload.pull_request?.base?.sha
      head = context.payload.pull_request?.head?.sha
      break
    case 'push':
      base = context.payload.before
      head = context.payload.after
      break
    default:
      core.setFailed(
        `This action only supports pull requests and pushes, ${context.eventName} events are not supported. ` +
          "Please submit an issue on this action's GitHub repo if you believe this in correct."
      )
  }


  const action = JSON.stringify(context.payload.action, undefined, 2)
  console.log(`action: ${action}`);
  console.log(`base: ${base}, head: ${head}`);
  const payload = JSON.stringify(context.payload.pull_request?.base?.sha, undefined, 2)
  console.log("--------------------------------");
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
