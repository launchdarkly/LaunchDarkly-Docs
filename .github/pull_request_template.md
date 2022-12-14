
<!--

Thank you for contributing to the docs!

### What to expect for automatic tests

When you create a PR, GitHub automatically deploys your PR to our docs staging site, and runs a number of tests. These tests should all pass before you merge your PR.

**During the Contexts EAP, there is one exception.** If you are merging into `main` and the "Testing / Check local links" test is failing, you can still merge, even with this failure. The failing links are links to files that currently only exist on the `contexts-eap` branch. We have redirects set up to make sure that customers who use those links are directed to the Contexts EAP docs on our docs staging site, but our internal link checker doesn't know to follow redirects.

### What to expect for PR review

When you mark your PR as ready for review, the Docs Reviewers team is automatically added as reviewers. This team is the only required reviewer.

If you need reviewers from other teams, such as your own squad, you can request them manually when you open the PR. You can also request a specific Docs team member to review your PR by adding them to the list of reviewers. You might want to do this if you've been working with a particular team member to write these docs.

For most PRs, one Docs team member will perform the review. For some larger PRs, the initial Docs team member will explicitly request review from a second Docs team member, because it's helpful to have more feedback on larger changes. In this situation, please wait for both Docs team members to approve the PR before merging. (Merging is blocked until at least one Docs team member approves.)


### What to expect for PR merge

Plan to merge your PR any time after it has been approved. It will be automatically deployed and published as soon as you merge. Depending on the change, you might want to merge your PR immediately, or you might wait until the day a feature flag is being flipped.

If you expect your PR to remain open for some time after approval, update the PR title with the expected merge date. The Docs team will periodically check in on approved PRs that have not yet been merged.

You can also schedule the merge in advance, for example if you have a firm release date planned. To learn how, read [Scheduling a PR merge to main](https://github.com/launchdarkly/git-gatsby/blob/main/README.md#internal-launchdarkly-use-only-scheduling-a-pr-merge-to-main).


### What to expect for PR deploy

All PRs are automatically deployed to production (docs.launchdarkly.com) as soon as they are merged to main. You can follow their deploy progress under GitHub Actions.

-->
