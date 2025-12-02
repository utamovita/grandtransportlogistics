import { MainBanner } from "./main-banner/main-banner.component";
import { Team } from "@components/views/contact/team/team.component";
import { TeamMember } from "@src/types/sanity-data";

type ContactViewProps = {
  teamMembers: TeamMember[];
};

function ContactView({ teamMembers }: ContactViewProps) {
  return (
    <>
      <MainBanner />
      <Team members={teamMembers} />
    </>
  );
}

export { ContactView }
