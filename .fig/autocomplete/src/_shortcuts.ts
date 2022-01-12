const completionSpec: Fig.Spec = {
  name: "_shortcuts",
  description: "Project shortcuts",
  additionalSuggestions: [
    {
      icon: "🛠",
      name: "Start dev server",
      insertValue: "\b\bnpm run dev",
      description: "Start the dev server",
    },
    {
      icon: "fig://template?badge=📖",
      name: "View Docs",
      insertValue: "\b\bopen https://docs.launchdarkly.com",
      description: "View the docs",
    },
    {
      icon: "fig://icon?type=string",
      name: "Open in VSCode",
      insertValue: "\b\bcode .",
      description: "Open VSCode",
    },
    {
      icon: "fig://icon?type=git",
      name: "Sync from Public",
      insertValue: "\b\bgit pull public main",
      description: "Sync public repo",
    },
  ],
};

export default completionSpec;