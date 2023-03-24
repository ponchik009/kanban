import classNames from "classnames";

import styles from "./TaskCard.module.css";

const TaskCard: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.Card}>
      <span>{text}</span>
      <div className={classNames(styles.meta, styles.text)}>
        <span className={styles.date}></span>
        <div className={styles.circle}></div>
        <div className={styles.createdBy}>
          Created by
          <span className={styles.createdByAuthor} title={text}>
            {" "}
            {text}
          </span>
        </div>
      </div>
      <div
        className={classNames(styles.text, styles.description)}
        // dangerouslySetInnerHTML={text}
      ></div>
      {/* <footer className={classNames(styles.footer)}>
        <Tooltip label="Количество комментариев">
          <div className={classNames(styles.comments)}>
            <CommentsIcon></CommentsIcon>

            <span className={classNames(styles.text, styles.commentCount)}>
              {+commentsCount}
            </span>
          </div>
        </Tooltip>
        <Avatar user={responsible}></Avatar>
      </footer> */}
    </div>
  );
};
export default TaskCard;
