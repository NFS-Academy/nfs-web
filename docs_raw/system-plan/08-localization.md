# Localization

## Goal

Support English and Bangla as first-class platform languages.

## Content Model

All user-facing content should allow language-specific fields:

- Title
- Description
- Labels
- Explanation
- Formula notes
- Hints
- Practice questions
- Solutions
- Error/help text

## Admin Workflow

- Editors can draft in one language first.
- Missing translations are visible in admin.
- Publishing can require both languages for core content.
- Language reviewers approve translation quality.

## UI Rules

- Language toggle must be available in learning pages.
- Bangla font must be readable on mobile and desktop.
- Formulas, symbols, and units should remain consistent across languages.

## Field Strategy

Use localized fields for content:

```text
title.en
title.bn
description.en
description.bn
explanation.en
explanation.bn
```

Formula symbols, numeric values, and units remain shared unless a display label
needs translation.

## Translation Status

Each content object should expose a translation status:

- `not_required`
- `missing`
- `partial`
- `ready_for_review`
- `approved`

## Publishing Rules

- MVP can publish English-first content if Bangla is marked partial.
- Core public pages and high-priority simulations should require Bangla before
  public launch.
- Admin must show missing translation warnings.

## Future Source Workflow

When future chapters arrive in clean English, extract math/scenario meaning from
English first. Bangla learning copy can be translated and reviewed afterward.
