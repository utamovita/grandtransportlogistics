import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { UsersIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "teamMember",
        title: "Załoga",
        icon: UsersIcon,
        S,
        context,
      }),

          S.divider(),

          ...S.documentTypeListItems().filter(
            (item) =>
              item.getId() &&
              !["teamMember"].includes(item.getId()!)
          ),
    ]);