import BarChart from "@/components/BarChart";

const Home = () => {
  return (
    <div>
      <BarChart
        title={"三大框架满意度"}
        categories={["Vue", "React", "Angular"]}
        data={[10, 20, 30]}
      />
      <BarChart
        title={"三大框架使用度"}
        categories={["Vue", "React", "Angular"]}
        data={[10, 20, 30]}
      />
    </div>
  );
};

export default Home;
