import { KeywordPageClient } from "./components/KeywordPageClient";
import { getKeywordData } from "./services/keywordService";

// This is a server component
const KeywordPage = async () => {
  // Fetch data on the server
  const keywordData = await getKeywordData();

  return (
    <KeywordPageClient initialData={keywordData} />
  );
};

export default KeywordPage;
