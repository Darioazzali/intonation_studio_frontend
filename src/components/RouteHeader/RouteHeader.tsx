import styles from "./routeheader.module.scss";
//A function for the Idioms or Playlists title

export default function RouteHeader({
  title,
  itemsCount,
}: {
  title: string;
  itemsCount: number;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
        <span className={styles.itemNumber}>{itemsCount}</span>
      </div>
    </div>
  );
}
