import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ibmVisitSnapshot } from "@/data/site/about";

export const metadata: Metadata = {
  title: "IEEE Foundation President & IBM Research Director Visit — IEEE BRACU SB",
  description:
    "IEEE Foundation President Dr. Richard J. Gowen and IBM Director at Research Dr. Kris Srikrishnan visited BRAC University on August 31, 2009.",
};

export default function IeeeFoundationIbmVisitPage() {
  return (
    <div className="space-y-8">
      {/* Page Header: Compact & Minimal */}
      <div className="border-b border-[#E3DFD5] pb-5">
        <div className="mb-2.5 inline-block rounded-full border border-[#00629B]/20 bg-[#EAF1F6] px-3 py-0.5 text-[11.5px] font-bold uppercase tracking-wider text-[#00629B]">
          Historic Milestone · August 31, 2009
        </div>
        <h1 className="m-0 font-serif text-[24px] font-bold tracking-tight text-[#0A2540] sm:text-[30px] lg:text-[34px]">
          IEEE Foundation President &amp; IBM Research Director Visits BRAC University
        </h1>
        <p className="m-0 mt-2 max-w-[75ch] text-[15px] leading-relaxed text-[#4A4E54]">
          A landmark occasion celebrating international technological collaboration, student innovation, and humanitarian engineering initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Main Content Article */}
        <article className="space-y-6 lg:col-span-8">
          <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 sm:p-8 shadow-xs space-y-5 text-[#3C4046] text-[15px] leading-[1.8]">
            {/* Historical Photo 1: mc1.jpg (Original Dimensions: 129x109) */}
            <div className="flex justify-center pt-1 pb-3">
              <a
                href="/assets/events/mc1.jpg"
                target="_blank"
                rel="noopener noreferrer"
                title="Click to view original image"
                className="group inline-block overflow-hidden rounded-xl border border-[#E3DFD5] bg-[#FAF9F5] p-1.5 shadow-xs transition-shadow hover:shadow-md"
              >
                <Image
                  src="/assets/events/mc1.jpg"
                  alt="Dr. Mumit Khan presenting at the session"
                  width={129}
                  height={109}
                  className="rounded-lg object-contain"
                  unoptimized
                />
              </a>
            </div>

            <p className="m-0 text-[16px] font-medium leading-[1.75] text-[#191B1E]">
              IEEE Foundation President <strong>Dr. Richard J. Gowen</strong> and IBM’s Director at Research <strong>Dr. Kris Srikrishnan</strong> visited BRAC University on 31st August. IEEE BRAC University Student Branch invited Dr. Gowen and Dr. Srikrishnan, who were in Bangladesh for a very brief period, to share their experiences with students of BRACU.
            </p>

            <p className="m-0">
              The guests were welcomed to BRACU by <strong>Professor Jamilur Reza Choudhury</strong>, the Vice Chancellor of BRACU.
            </p>

            <p className="m-0">
              At the beginning of the session, <strong>Shiblee Imtiaz Hasan</strong>, Secretary of IEEE BRACU Student Branch, made a brief presentation highlighting the various activities carried out by the branch in 2009.
            </p>

            <div className="rounded-xl border-l-4 border-l-[#00629B] border border-[#E3DFD5] bg-[#FBFAF7] p-5 my-4">
              <h2 className="m-0 font-serif text-[17px] font-bold text-[#0A2540]">
                Research on Bangla Language Processing (CRBLP)
              </h2>
              <p className="m-0 mt-2 text-[14.5px] leading-[1.75] text-[#4A4E54]">
                This was followed by a brief outline of the activities of Centre for Research on Bangla Language Processing (CRBLP) of the university, which was presented by <strong>Dr. Mumit Khan</strong>, Chairperson, Department of Computer Science and Engineering, BRACU and Head of CRBLP. CRBLP has been working on generating speech from Bangla Text. Text to Speech (TTS) system for the Bangla language can help tackle the illiteracy problem, empower the visually impaired and increase the possibilities of improved human-machine interaction.
              </p>
            </div>

            {/* Historical Photo 2: rs5-300x107.jpg (Original Dimensions: 300x107) */}
            <div className="flex flex-col items-center py-4 text-center">
              <a
                href="/assets/events/rs5.jpg"
                target="_blank"
                rel="noopener noreferrer"
                title="Click to view full size image"
                className="group inline-block overflow-hidden rounded-xl border border-[#E3DFD5] bg-[#FAF9F5] p-2 shadow-xs transition-shadow hover:shadow-md"
              >
                <Image
                  src="/assets/events/rs5-300x107.jpg"
                  alt="Vice Chancellor Prof. Jamilur Reza Choudhury, Dr. Richard J. Gowen, Dr. Kris Srikrishnan at BRAC University"
                  width={300}
                  height={107}
                  className="rounded-lg object-contain"
                  unoptimized
                />
              </a>
              <p className="mt-2 text-center text-[12.5px] text-[#6E7178]">
                Vice Chancellor Prof. Jamilur Reza Choudhury, Dr. Richard J. Gowen, Dr. Kris Srikrishnan, Dr. Sayeed Salam, and Dr. A.K.M. Azad at the session.
              </p>
            </div>

            <p className="m-0">
              The experience sharing session followed afterwards, where <strong>Dr. Gowen</strong> talked about the goals of the IEEE Humanitarian Technology Program and explained how IEEE could play a major role to bridge the gap amongst the needs of the community, Current services provided and available technology. He informed the audience that IEEE has developed a wiki where everyone can share their Humanitarian Project Ideas with the goal of solving local problems with existing technology.
            </p>

            <p className="m-0">
              <strong>Dr. Srikrishnan</strong> talked about the humanitarian activities undertaken by IBM which includes joint projects with IEEE. He explained why IBM works on solving problems rather than creating general products. At the end of the experience sharing session, Dr. Gowen and Dr. Srikrishnan expressed delight at being able to visit a university in Bangladesh, and said they looked forward to future cooperation with BRACU.
            </p>

            <p className="m-0">
              The session concluded with a &lsquo;Vote of Thanks&rsquo; by <strong>Md. Shamsul Kaonain</strong>, member of the IEEE BRACU Student Branch.
            </p>

            <div className="border-t border-[#E3DFD5] pt-5 mt-6">
              <p className="m-0 text-[14.5px] leading-[1.75] text-[#4A4E54]">
                Professor Jamilur Reza Choudhury, Vice Chancellor, BRACU, chaired the session. Dr. Sayeed Salam, Chairperson, Department of Electrical and Electronic Engineering, BRACU, Dr. A.K.M. Azad, Branch Counselor, IEEE BRACU Student Branch, Nabila Naushin, Chairperson, IEEE BRACU Student Branch and other executive body members of the IEEE BRACU Student Branch were also present.
              </p>
              <p className="m-0 mt-3 text-[13px] font-semibold italic text-[#00629B]">
                (By Md. Shamsul Kaonain)
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            {/* Event Snapshot Card */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs">
              <div className="mb-4 flex items-center justify-between border-b border-[#E3DFD5] pb-3">
                <h3 className="m-0 font-serif text-[17px] font-bold text-[#0A2540]">
                  Event Snapshot
                </h3>
                <span className="rounded-full bg-[#EAF1F6] px-2.5 py-0.5 text-[11px] font-bold text-[#00629B]">
                  Historical
                </span>
              </div>
              <div className="space-y-3.5">
                {ibmVisitSnapshot.map((item) => (
                  <div key={item.label} className="border-b border-[#F0ECE1] pb-3 last:border-0 last:pb-0">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A9E9F]">
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-[13.5px] font-semibold text-[#191B1E]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Topics Card */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs">
              <h3 className="m-0 mb-3 font-serif text-[16px] font-bold text-[#0A2540]">
                Key Highlights
              </h3>
              <ul className="m-0 space-y-2.5 pl-4 text-[13px] text-[#4A4E54]">
                <li>IEEE Humanitarian Technology Program &amp; Project Wiki</li>
                <li>IBM humanitarian initiatives &amp; problem-centric innovation</li>
                <li>CRBLP Bangla Text-to-Speech (TTS) system demonstration</li>
                <li>2009 IEEE BRACU Student Branch activity retrospective</li>
              </ul>
            </div>

            {/* Navigation Card */}
            <div className="rounded-2xl border border-[#E3DFD5] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <Link
                  href="/about/branch"
                  className="text-[13px] font-semibold text-[#00629B] hover:underline"
                >
                  &larr; About Student Branch
                </Link>
                <Link
                  href="/gallery"
                  className="text-[13px] font-semibold text-[#00629B] hover:underline"
                >
                  Photo Gallery &rarr;
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
