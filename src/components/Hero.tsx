import Link from "next/link";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { publicProfile } from "@/data/public-profile";
export function Hero() {
  return (
    <section
      className="shell grid grid-cols-[minmax(0,1fr)_64px] gap-x-4 py-10 md:grid-cols-[minmax(0,620px)_144px] md:justify-between md:gap-x-16 md:py-14"
      aria-labelledby="home-title"
    >
      <div>
        <p className="text-sm text-muted">Dallas, Texas</p>
        <h1 id="home-title" className="editorial-title mt-3">
          {publicProfile.headline}
        </h1>
      </div>
      <ProfileAvatar
        size={144}
        priority
        variant="intro"
        className="col-start-2 row-start-1 h-20 w-16 object-cover object-top md:row-span-4 md:h-[180px] md:w-36"
      />
      <p className="col-span-2 mt-5 max-w-[620px] text-lg leading-relaxed text-fg-muted md:col-span-1">
        {publicProfile.introduction}
      </p>
      <p className="col-span-2 mt-4 max-w-[620px] text-base leading-relaxed text-fg-muted md:col-span-1">
        {publicProfile.personalIntroduction}
      </p>
      <div className="col-span-2 mt-5 flex flex-wrap gap-x-7 gap-y-1 md:col-span-1">
        <Link href="#selected-work" className="text-link">
          Explore my work
        </Link>
        <Link href="/about/" className="text-link">
          About me
        </Link>
        <Link href="/contact/" className="text-link">
          Contact
        </Link>
      </div>
    </section>
  );
}
