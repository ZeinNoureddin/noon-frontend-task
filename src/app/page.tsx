import homeStyles from "@/styles/Home.module.scss";
import commonStyles from "@/styles/Common.module.scss";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const styles = { ...commonStyles, ...homeStyles };

  return (
    <main className={styles.pageWrapper}>
      <section
        aria-labelledby="home-heading"
        className={styles.homePageWrapper}
      >
        <h1 className={styles.homeHeader}>Find your favourite films</h1>
        <SearchBar />
      </section>
    </main>
  );
}
