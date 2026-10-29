import { JsonLd } from "@/components/JsonLd";
import { getTrapExtras } from "@/lib/trap-extras";
import type { DesignPageContent } from "@/lib/trap-designs";
import { findTrackStep } from "@/lib/systems";
import { TRAPS_REPO_URL } from "@/lib/traps";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import {
    Callout, CheckYourself, CodeTabs, Flow, GitHubCard, LessonShell, OptionCards, Prose, RememberNext, Section, SummaryCard, WatchShort, WordsYouNeed,
} from "@/components/labs/lesson/Lesson";

/** A design decision taught with the lesson template. No replay: the traps after it break it. */
export function DesignPage({ design }: { design: DesignPageContent }) {
    const path = `/labs/traps/${design.slug}`;
    const track = findTrackStep(path)?.track;
    const extras = getTrapExtras(design.slug);
    const youtubeReel = extras.reels?.find((reel) => reel.platform === "youtube" && reel.youtubeId);
    const instagramReel = extras.reels?.find((reel) => reel.platform === "instagram");
    const notesUrl = `${TRAPS_REPO_URL}/tree/main/${design.sourcePath}`;
    const schema = [
        webPageJsonLd({ path, name: design.title, description: design.question }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            ...(track ? [{ name: track.name, path: `/labs/systems/${track.id}` }] : []),
            { name: design.title, path },
        ]),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <LessonShell path={path} title={design.title} question={design.question}>
                <SummaryCard items={[
                    { label: "The problem", text: design.summary.problem },
                    ...design.summary.options,
                    { label: "Common choice", text: design.summary.choice },
                    { label: "In an interview", text: design.rule },
                ]} />

                <Section id="why" title="Why it matters">
                    <Prose paragraphs={design.why} />
                </Section>

                <Section id="words" title="Words you need">
                    <WordsYouNeed ids={design.words} />
                </Section>

                <Section id="picture" title="Picture it">
                    <p className="mb-5 text-(--l-muted)">{design.picture.intro}</p>
                    <div className="space-y-4">
                        {design.picture.flows.map((flow) => <Flow key={flow.title} {...flow} />)}
                    </div>
                </Section>

                <Section id="options" title="The options">
                    <OptionCards options={design.options} />
                </Section>

                <Section id="choice" title="The choice and its cost">
                    <Prose paragraphs={design.choice.paragraphs} />
                    <Callout tone="warn" title="What it costs">{design.choice.cost}</Callout>
                    {design.choice.alsoSay && <Callout tone="info" title={design.choice.alsoSay.title}>{design.choice.alsoSay.body}</Callout>}
                </Section>

                <Section id="check" title="Check yourself">
                    <CheckYourself items={design.checks} />
                </Section>

                <Section id="code" title="The code">
                    <CodeTabs tabs={design.code.map((tab) => ({ ...tab, href: notesUrl }))} />
                    <GitHubCard
                        title="Every trap in this world is runnable"
                        body="The design notes are in the repo, and each trap that follows ships with the bug, the fix and a test that proves it."
                        secondary={{ label: "Design notes", href: notesUrl }}
                    />
                </Section>

                {youtubeReel?.youtubeId && (
                    <WatchShort youtubeId={youtubeReel.youtubeId} youtubeUrl={youtubeReel.url} instagramUrl={instagramReel?.url} title={`${design.title}: reel`} />
                )}

                <RememberNext remember={design.remember} path={path} />
            </LessonShell>
        </>
    );
}
