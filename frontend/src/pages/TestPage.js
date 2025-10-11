import ImageUploader from "../components/ImageUploader";
import CreatePost from "../components/CreatePost";
import UsernameAndPFPCard from "../components/UsernameAndPFPCard";

const TestPage = () => {
  return (
    <div>
      <h1>Test Page</h1>
        <CreatePost />
        <div style={{width: '25%'}}>
          <UsernameAndPFPCard />
        </div>
    </div>
  );
};

export default TestPage;