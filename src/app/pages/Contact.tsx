import { site } from "../content/site";
import MailForm from "../components/MailForm";
import Reveal from "../components/Reveal";
import Split from "../components/Split";

export default function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <Reveal as="span" className="eyebrow">Contact</Reveal>
        <Split as="h1" className="h-page h-page--regular" parts={[["A little help"], ["\n"], ["goes a long way."]]} />
        <Reveal as="p" className="lead" delay={150}>Questions, feedback or a privacy request? Write to us.</Reveal>

        <div className="contact__grid">
          <Reveal className="mailcard">
            <span className="eyebrow eyebrow--soft">Email</span>
            <a className="mailcard__mail" href={`mailto:${site.email}`}>{site.email}</a>
            <p>For questions about the app, subscriptions, feedback and privacy requests.</p>
            <a className="mailcard__link" href={`mailto:${site.email}`}>Write an email ↗</a>
          </Reveal>
          <Reveal className="formcard" delay={120}>
            <span className="eyebrow">Feedback</span>
            <MailForm
              subject={`${site.brand} — feedback`}
              submit="Send message"
              fields={[
                { name: "email", label: "Your email", type: "email", required: true, auto: "email" },
                { name: "topic", label: "Topic", options: ["App question", "Connection request", "Subscription", "Privacy request", "Feedback"], required: true },
                { name: "message", label: "Message", textarea: true, required: true },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
