import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  branchMilestones,
  branchAtAGlance,
  branchCounselor,
  branchFoundingEB,
} from "@/data/site/about";
import { technicalChapters } from "@/data/site/chapters";

export const metadata: Metadata = {
  title: "Inauguration of the Student Branch — IEEE BRACU SB",
  description:
    "The inaugural session and founding history of the IEEE Student Branch at BRAC University on July 6, 2008.",
};

export default function AboutBranchPage() {
  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#E3DFD5] pb-6">
        <div className="mb-2.5 inline-block rounded-full border border-[#00629B]/20 bg-[#EAF1F6] px-3 py-0.5 text-[11.5px] font-bold uppercase tracking-wider text-[#00629B]">
          Historic Milestone · July 6, 2008
        </div>
        <h1 className="m-0 font-serif text-[26px] font-bold tracking-tight text-[#0A2540] sm:text-[32px] lg:text-[36px]">
          Inauguration of the IEEE BRAC University Student Branch
        </h1>
        <p className="m-0 mt-2.5 text-[13.5px] text-[#6E7178] italic">
          ** The following entry was composed during the initial years of the student branch, around 2008
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Main Article Content */}
        <article className="space-y-10 lg:col-span-8">
          {/* Historical Inauguration Story */}
          <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 sm:p-8 shadow-xs space-y-6 text-[#3C4046] text-[15.5px] leading-[1.8]">
            <p className="m-0">
              The Inaugural Session of the IEEE (Institute of Electrical and Electronics Engineers) Student Branch at BRAC University was held on the <strong>6th of July</strong> at the Indoor Games room of BRAC University. The whole session turned out to be more interesting and informative than had been expected. Members and non-members alike found the event to be educational and yet enjoyable with the range of different topics that came up in the speeches from the distinguished guests.
            </p>

            <p className="m-0">
              The event started with a warm welcome and a brief presentation by the <strong>President of the IEEE Student Branch at BRAC University, Mahdin Mahboob</strong>. Towards the end of his presentation, he showed <em>‘IEEE Evolution’</em>, a two-minute promotional video of IEEE showing the history of engineering, which, to budding engineers, proved to be a great source of inspiration!
            </p>

            {/* Historical Image: Late Prof. Jamilur Reza Choudhury */}
            <div className="flex flex-col items-center py-3 text-center">
              <div className="group inline-block overflow-hidden rounded-2xl border border-[#E3DFD5] bg-[#FAF9F5] p-2 shadow-xs transition-shadow hover:shadow-md">
                <Image
                  src="/assets/people/jamil_ur_reza.png"
                  alt="Professor Jamilur Reza Choudhury, founding Vice Chancellor of BRAC University"
                  width={300}
                  height={261}
                  className="rounded-xl object-contain mx-auto"
                />
              </div>
              <p className="mt-2.5 max-w-[54ch] text-center text-[12.5px] text-[#6E7178] leading-snug">
                Late National Professor <strong>Jamilur Reza Choudhury</strong>, Vice Chancellor of BRAC University, whose leadership, vision, and patronship made establishing the IEEE Student Branch possible.
              </p>
            </div>

            <p className="m-0">
              Following that, the student branch was officially inaugurated amidst rounds of applause when <strong>Professor Saifur Rahman</strong>, Chief Guest of the event, launched the student branch website. Prof. Rahman is the Director of the Advanced Research Institute at Virginia Tech and is also the former Vice President of the IEEE Publications Board.
            </p>

            <p className="m-0">
              The Special Guest on the occasion was <strong>Professor Aynal Haque</strong> from BUET who was then serving as the Chair of the IEEE Bangladesh Section. <strong>Professor Jamilur Reza Chowdhury</strong>, Vice Chancellor of BRAC University, was also present and chaired the event. <strong>Professor Sayeed Salam</strong>, Chairperson of the Department of Computer Science and Engineering, <strong>Professor Mumit Khan</strong>, and Associate <strong>Professor Dr. AKM Azad</strong> from the same department were also present on the occasion, speaking about the importance of an IEEE membership and expressing their feelings about the new student branch at BRACU. <strong>Mr. Mahmood Hasan</strong>, Registrar of BRACU, and faculty members from different departments of the university were also present.
            </p>

            <p className="m-0">
              Afterwards, Prof. Aynal Haque gave a detailed lecture about IEEE and its background, which was followed by a PowerPoint presentation. His lecture had been very informative and the concept of IEEE was made clear to the audience.
            </p>

            <p className="m-0">
              The next speech was delivered by Prof. Saifur Rahman, and with his charming presence and interactive speech, the entire hall literally went into ‘pin drop silence’ mode. His speech was very interesting and informative to say the least. He caught everyone’s attention with his beautiful examples of why students should become members of IEEE and how they will be benefited from it, as well as the important aspects of networking through such a large organization. He mentioned that IEEE is not only for nerds alone, but it also had businessmen, lawyers, and even dancers as its members!
            </p>

            {/* VC Encouragement & Patronage Callout */}
            <div className="rounded-xl border-l-4 border-l-[#00629B] border border-[#E3DFD5] bg-[#FBFAF7] p-5 my-2">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#00629B] mb-1">
                Founding Patronage
              </div>
              <p className="m-0 text-[15px] font-medium leading-[1.75] text-[#191B1E] italic">
                “Afterward, the Vice Chancellor’s encouraging speech also added up to the enthusiasm and he promised to provide the branch with financial help whenever it becomes necessary. It is also worth mentioning that without his support from the very beginning, establishing the student branch would not have been possible.”
              </p>
            </div>

            <p className="m-0">
              The event concluded with the ‘Vote of Thanks’ by the Secretary of the IEEE student branch, BRAC University, <strong>Nabila Naushin</strong>. She specially thanked the Chief Guest and the Special Guest for making time from their busy schedules and being present at the event, and thanked all others who helped establish the student branch. Finally, she called for refreshments and soon after that, a documentary titled <strong>‘Future World’</strong> was shown, thus bringing the event to an end.
            </p>

            {/* Founding Executive Body Box */}
            <div className="border-t border-[#E3DFD5] pt-5 mt-6">
              <div className="text-[12px] font-bold uppercase tracking-wider text-[#00629B] mb-3">
                Founding Executive Body (2008)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {branchFoundingEB.map((member) => (
                  <div key={member.role} className="rounded-xl border border-[#E3DFD5] bg-[#FAF9F5] p-3 text-left">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#6E7178]">
                      {member.role}
                    </div>
                    <div className="text-[13.5px] font-semibold text-[#191B1E] mt-0.5">
                      {member.name}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12.5px] text-[#6E7178] italic">
                All of them, together with the help of a dedicated group of volunteers, worked day and night to make this inaugural event a total success. (Reported by Sahar Noor Abdal)
              </p>
            </div>
          </div>

          {/* Technical Chapters Showcase */}
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-3">
              <h2 className="m-0 font-serif text-[24px] font-bold text-[#0A2540]">
                Our Technical Chapters
              </h2>
              <span className="text-[13px] font-bold text-[#00629B]">
                6 Chapters
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {technicalChapters.map((c) => (
                <Link
                  key={c.slug}
                  href={`/chapters/${c.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-[#E3DFD5] bg-white p-4 shadow-xs transition-all hover:border-[#00629B]/40 hover:bg-[#EAF1F6]/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A2540] text-[12px] font-bold text-white group-hover:bg-[#00629B] transition-colors">
                      {c.abbr}
                    </span>
                    <span className="text-[14px] font-semibold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      {c.name}
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#9A9E9F] transition-transform group-hover:translate-x-1 group-hover:text-[#00629B]">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>

          {/* Milestones Timeline */}
          <section className="space-y-6">
            <h2 className="m-0 font-serif text-[24px] font-bold text-[#0A2540]">
              Key Milestones
            </h2>
            <div className="space-y-3">
              {branchMilestones.map((m) => (
                <div
                  key={m.year}
                  className="flex items-start gap-4 rounded-xl border border-[#E3DFD5] bg-white p-4 shadow-xs transition-all hover:border-[#00629B]/30"
                >
                  <span className="shrink-0 rounded-lg bg-[#EAF1F6] px-3 py-1 font-serif text-[15px] font-bold text-[#00629B]">
                    {m.year}
                  </span>
                  <p className="m-0 text-[14.5px] leading-relaxed text-[#3C4046]">
                    {m.event}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            {/* Branch Counselor Card */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 text-center shadow-xs">
              <div className="relative mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-[#00629B]/20 shadow-xs">
                <Image
                  src={branchCounselor.image || "/assets/people/branch-counselor.jpg"}
                  alt={branchCounselor.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <h3 className="m-0 font-serif text-[17px] font-bold text-[#0A2540]">
                {branchCounselor.name}
              </h3>
              <p className="m-0 mt-1 text-[12px] font-bold uppercase tracking-wider text-[#00629B]">
                {branchCounselor.title}
              </p>
              <div className="mt-4 border-t border-[#E3DFD5] pt-3">
                <a
                  href={`mailto:${branchCounselor.email}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6E7178] hover:text-[#00629B] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {branchCounselor.email}
                </a>
              </div>
            </div>

            {/* At a Glance Metadata Card */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs">
              <div className="mb-5 flex items-center justify-between border-b border-[#E3DFD5] pb-4">
                <h3 className="m-0 font-serif text-[18px] font-bold text-[#0A2540]">
                  At a Glance
                </h3>
                <span className="rounded-full bg-[#EAF1F6] px-2.5 py-0.5 text-[11px] font-bold text-[#00629B]">
                  Profile
                </span>
              </div>
              <div className="space-y-3.5">
                {branchAtAGlance.map((item) => (
                  <div key={item.label} className="border-b border-[#F0ECE1] pb-3 last:border-0 last:pb-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A9E9F]">
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-[14px] font-semibold text-[#191B1E]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
