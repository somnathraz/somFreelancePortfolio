import { JsonLd } from "@/components/JsonLd";
import { getTrapExtras } from "@/lib/trap-extras";
import type { TrapLessonContent } from "@/lib/trap-lessons";
import { getLevel } from "@/lib/trap-game/levels";
import { findTrackStep } from "@/lib/systems";
import { TRAPS_REPO_URL } from "@/lib/traps";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import {
    AttemptCards, Callout, CheckYourself, CodeTabs, Flow, GitHubCard, LessonShell, PlayCard, Prose, RememberNext, Section, SummaryCard, WatchShort, WordsYouNeed,
} from "@/components/labs/lesson/Lesson";

/** A bug inside a system, taught with the lesson template. The replay is the Break the Backend level. */
export function TrapLessonPage({ lesson }: { lesson: TrapLessonContent }) {
    const path = `/labs/traps/${lesson.slug}`;
    const track = findTrackStep(path)?.track;
    const level = getLevel(lesson.level);
    const extras = getTrapExtras(lesson.slug);
    const youtubeReel = extras.reels?.find((reel) => reel.platform === "youtube" && reel.youtubeId);
    const instagramReel = extras.reels?.find((reel) => reel.platform === "instagram");
    const repoUrl = `${TRAPS_REPO_URL}/tree/main/${lesson.sourcePath}`;
    const schema = [
        webPageJsonLd({ path, name: lesson.title, description: lesson.question }),
        breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Labs", path: "/labs" },
            { name: "Interview traps", path: "/labs/traps" },
            ...(track ? [{ name: track.name, path: `/labs/systems/${track.id}` }] : []),
            { name: lesson.title, path },
        ]),
    ];

    return (
        <>
            <JsonLd data={schema} />
            <LessonShell path={path} title={lesson.title} question={lesson.question}>
                <SummaryCard items={[
                    { label: "The problem", text: lesson.summary.problem },
                    { label: "Why it happens", text: lesson.summary.cause },
                    { label: "The fix", text: lesson.summary.fix },
                    { label: "In an interview", text: lesson.rule },
                ]} />

                <Section id="why" title="Why it matters">
                    <Prose paragraphs={lesson.why} />
                </Section>

                <Section id="words" title="Words you need">
                    <WordsYouNeed ids={lesson.words} />
                </Section>

                <Section id="picture" title="Picture it">
                    <p className="mb-5 text-(--l-muted)">{lesson.picture.intro}</p>
                    <div className="space-y-4">
                        {lesson.picture.flows.map((flow) => <Flow key={flow.title} {...flow} />)}
                    </div>
                </Section>

                {level && (
                    <Section id="play" title="Break it yourself">
                        <PlayCard href={`/labs/traps/play/${level.id}`} title={level.title} />
                    </Section>
                )}

                <Section id="attempts" title="The fixes people try">
                    <AttemptCards attempts={lesson.attempts} />
                </Section>

                <Section id="fix" title="The fix and its cost">
                    <Prose paragraphs={lesson.fix.paragraphs} />
                    <Callout tone="warn" title="What it costs">{lesson.fix.cost}</Callout>
                    {lesson.fix.alsoSay && <Callout tone="info" title={lesson.fix.alsoSay.title}>{lesson.fix.alsoSay.body}</Callout>}
                </Section>

                <Section id="check" title="Check yourself">
                    <CheckYourself items={lesson.checks} />
                </Section>

                <Section id="code" title="The code">
                    <CodeTabs tabs={lesson.code.map((tab) => ({ ...tab, href: repoUrl }))} />
                    <GitHubCard
                        title="Star the repo for the runnable version"
                        body="Each trap in this world ships with the bug, the fix and a proof test that fires concurrent requests at a real database."
                        secondary={{ label: "See the folder", href: repoUrl }}
                    />
                </Section>

                {youtubeReel?.youtubeId && (
                    <WatchShort youtubeId={youtubeReel.youtubeId} youtubeUrl={youtubeReel.url} instagramUrl={instagramReel?.url} title={`${lesson.title}: reel`} />
                )}

                <RememberNext remember={lesson.remember} path={path} />
            </LessonShell>
        </>
    );
}
