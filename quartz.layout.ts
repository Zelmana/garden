import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Type-safe handle to Explorer options
type ExplorerOpts = Parameters<typeof Component.Explorer>[0]

// Felix-style: folders first; use folderOrder/noteOrder; fallback to natural name
const sortByFrontmatter: ExplorerOpts["sortFn"] = (a, b) => {
  const fmA = a.data?.frontmatter ?? {}
  const fmB = b.data?.frontmatter ?? {}

  const orderA = a.isFolder
    ? (fmA.folderOrder as number | undefined)
    : (fmA.noteOrder as number | undefined)
  const orderB = b.isFolder
    ? (fmB.folderOrder as number | undefined)
    : (fmB.noteOrder as number | undefined)

  // Keep folders above files
  if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1

  // If same type, use manual numbers first
  if (orderA != null && orderB != null) return orderA - orderB
  if (orderA != null) return -1
  if (orderB != null) return 1

  // Fallback: natural alphanumeric by displayName
  return a.displayName.localeCompare(b.displayName, undefined, { numeric: true, sensitivity: "base" })
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Zelm's Discord": "https://discordapp.com/users/737498389662662676",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({ sortFn: sortByFrontmatter }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ sortFn: sortByFrontmatter }),
  ],
  right: [],
}

