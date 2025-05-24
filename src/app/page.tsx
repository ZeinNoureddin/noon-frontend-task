import homeStyles from "@/styles/Home.module.scss";
import commonStyles from "@/styles/Common.module.scss";
import SearchBar from "@/components/SearchBar";
import PopularRibbon from "@/components/PopularRibbon";

export default function Home() {
  const styles = { ...commonStyles, ...homeStyles };

  return (
    <main className={styles.homeMainContainer}>
      <section
        aria-labelledby="home-heading"
        className={styles.homePageWrapper}
      >
        <h1 className={styles.homeHeader}>Find your favourite films</h1>
        <SearchBar />
      </section>
      <PopularRibbon />
    </main>
  );
}
