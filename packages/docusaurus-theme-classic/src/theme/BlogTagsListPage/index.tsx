/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Link from '@docusaurus/Link';
import BlogLayout from '@theme/BlogLayout';
import type {Props} from '@theme/BlogTagsListPage';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';

function getCategoryOfTag(tag: string) {
  // tag's category should be customizable
  return tag[0].toUpperCase();
}

function BlogTagsListPage(props: Props): JSX.Element {
  const {tags, sidebar} = props;
  const title = translate({
    id: 'theme.tags.tagsPageTitle',
    message: 'Tags',
    description: 'The title of the tag list page',
  });

  const tagCategories: {[category: string]: string[]} = {};
  Object.keys(tags).forEach((tag) => {
    const category = getCategoryOfTag(tag);
    tagCategories[category] = tagCategories[category] || [];
    tagCategories[category].push(tag);
  });
  const tagsList = Object.entries(tagCategories).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  const tagsSection = tagsList
    .map(([category, tagsForCategory]) => (
      <article key={category}>
        <h2>{category}</h2>
        {tagsForCategory.map((tag) => (
          <Link
            className="padding-right--md"
            href={tags[tag].permalink}
            key={tag}>
            {tags[tag].name} ({tags[tag].count})
          </Link>
        ))}
        <hr />
      </article>
    ))
    .filter((item) => item != null);

  return (
    <BlogLayout
      title={title}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogTagsListPage}
      searchMetadatas={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_tags_list',
      }}
      sidebar={sidebar}>
      <h1>{title}</h1>
      <section className="margin-vert--lg">{tagsSection}</section>
    </BlogLayout>
  );
}

export default BlogTagsListPage;
