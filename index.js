"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const core = require('@actions/core');
const github_1 = require("@actions/github");
try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    let base;
    let head;
    const eventName = github_1.context.eventName;
    switch (eventName) {
        case 'pull_request':
            base = (_b = (_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.base) === null || _b === void 0 ? void 0 : _b.sha;
            head = (_d = (_c = github_1.context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.head) === null || _d === void 0 ? void 0 : _d.sha;
            break;
        case 'push':
            base = github_1.context.payload.before;
            head = github_1.context.payload.after;
            break;
        default:
            core.setFailed(`This action only supports pull requests and pushes, ${github_1.context.eventName} events are not supported. ` +
                "Please submit an issue on this action's GitHub repo if you believe this in correct.");
    }
    const action = JSON.stringify(github_1.context.payload.action, undefined, 2);
    console.log(`action: ${action}`);
    console.log(`base: ${base}, head: ${head}`);
    const payload = JSON.stringify((_e = github_1.context.payload.pull_request) === null || _e === void 0 ? void 0 : _e.base, undefined, 2);
    console.log("--------------------------------");
    console.log(`The event payload: ${payload}`);
}
catch (error) {
    core.setFailed(error.message);
}
//# sourceMappingURL=index.js.map