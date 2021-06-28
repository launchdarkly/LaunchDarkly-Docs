# ChildPageList

This component renders a list of navigation links to the immediate children of the nav item specified by its path. Links are listed alphabetically by label.

## Props

`path`: path of the parent navigation item, whose children are listed
`omit` (optional): a comma-separated list of children omitted, specified by their paths
`append` (optional): an array of links added to the list, in the form `{ label, path }`, sorted alphabetically

## Usage

Render a list of the immediate children of `/integrations/collaboration`:

```
<ChildPageList path="/integrations/collaboration" />
```

You can include a comma-separated list of items to omit. The following renders the immediate children of `/home/data-export` _except_ for the link `/home/data-export/schema-reference`:

```
<ChildPageList path="/home/data-export" omit="/home/data-export/schema-reference" />
```

You can include an array of items of the form `{ label, path }` to append to the list. The following lists all immediate children of `/integrations/more`, plus a link to `/home/connecting/webhooks` labeled `Webhooks`:

```
<ChildPageList path="/integrations/more" append={[{ label: 'Webhooks', path: '/home/connecting/webhooks' }]} />
```
