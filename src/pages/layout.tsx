import clsx from 'clsx';

import styles from './layout.module.scss';
import utilStyles from './utils.module.scss';

import type { FC, PropsWithChildren } from 'react';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <nav className={utilStyles.container}>
          <a href="/">App</a>
        </nav>
      </header>
      <main className={clsx(styles.main, utilStyles.container)}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={utilStyles.container}>Footer</div>
      </footer>
    </div>
  );
};
