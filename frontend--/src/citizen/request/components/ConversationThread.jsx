import UserRequestMessage from "./UserRequestMessage";
import AIProcessingState from "./AIProcessingState";
import AIResponse from "./AIResponse";
import WhyExplanation from "./WhyExplanation";
import EvidenceSection from "./EvidenceSection";
import WhatsNext from "./WhatsNext";
import FollowUpComposer from "./FollowUpComposer";

export default function ConversationThread({
  request,
  isProcessing = false,
  onFollowUp,
}) {
  return (
    <section
      className="space-y-5"
      aria-label="CivicMirror request conversation"
    >
      <UserRequestMessage request={request} />

      {isProcessing && <AIProcessingState />}

      {!isProcessing && (
        <>
          <AIResponse response={request?.aiResponse} />

          <WhyExplanation explanation={request?.explanation} />

          <EvidenceSection evidence={request?.evidence} />

          <WhatsNext nextSteps={request?.nextSteps} />

          <FollowUpComposer onSubmit={onFollowUp} />
        </>
      )}
    </section>
  );
}