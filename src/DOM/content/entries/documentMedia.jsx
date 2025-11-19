// 1) Let Vite collect all PDFs in the documents folder
const files = import.meta.glob("../documents/*.pdf", { eager: true });

// Map filename -> URL
const fileUrlMap = {};
for (const path in files) {
  const url = files[path].default;
  const filename = path.split("/").pop();
  fileUrlMap[filename] = url;
}

// 2) Logical mapping from topic -> list of docs
// Here you just declare filenames; the URLs are resolved via fileUrlMap.
const documentConfig = {
  resume: {
    title: "Resume",
    subtitle: "Skills & Work History",
    docs: [
      {
        id: "resume-main",
        label: "Resume",
        filename: "Varun Nadgir Resume.pdf",
      },
    ],
  },

  elvtr: {
    title: "ELVTR Tech Art",
    subtitle: "Certificate & Letter of Recommendation",
    docs: [
      {
        id: "elvtr-cert",
        label: "Certificate",
        filename: "ELVTR Certificate Varun.pdf",
      },
      {
        id: "elvtr-lor",
        label: "Letter of Recommendation",
        filename: "ELVTR Letter of Recommendation Varun.pdf",
      },
    ],
  },

  datasci: {
    title: "Data Science",
    subtitle: "Certificates & Projects",
    docs: [
      {
        id: "mit-adsp",
        label: "MIT ADSP",
        filename: "VarunNadgir-MIT-ADSP.pdf",
      },
      {
        id: "springboard-career",
        label: "Springboard Data Science Career Track",
        filename: "VarunDataScienceCareerTrackCertificate.pdf",
      },
      {
        id: "intermediate-r",
        label: "Datacamp: R",
        filename: "intermediateRdatacamp.pdf",
      },
      {
        id: "intermediate-python",
        label: "Datacamp: Python",
        filename: "intermediatePythonDataScience.pdf",
      },
    ],
  },
};

// 3) Hydrate docs with URLs
export const documentsByTopic = Object.fromEntries(
  Object.entries(documentConfig).map(([topicId, topic]) => [
    topicId,
    {
      ...topic,
      docs: topic.docs
        .map((doc) => {
          const url = fileUrlMap[doc.filename];
          if (!url) return null;
          return { ...doc, url };
        })
        .filter(Boolean),
    },
  ])
);
