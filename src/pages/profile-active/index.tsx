import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Filter } from 'features/filter';
import { fetchActiveTasks } from 'entities/task/model';
import { TaskList } from 'entities/task/ui/task-list';
import { useMediaQuery } from 'shared/hooks';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter';

import styles from './styles.module.css';

export function ProfileActivePage() {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector((store) => store.tasks);
  const { role } = useAppSelector((state) => state.user);

  const isMobile = useMediaQuery('(max-width:1150px)');

  const { isPopupOpen } = useAppSelector((store) => store.createRequest);
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  useEffect(() => {
    dispatch(fetchActiveTasks());
  }, []);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <SideMenuForAuthorized />
        </>
      }
      content={
        <ContentLayout
          heading={
            <SmartHeader
              text="Активные заявки"
              icon={
                <Icon color="blue" icon="ActiveApplicationIcon" size="54" />
              }
              filter={
                role === 'volunteer' ? (
                  <Filter
                    items={{
                      sort: true,
                      categories: true,
                      radius: true,
                      date: false,
                      time: true,
                    }}
                  />
                ) : (
                  <Filter
                    items={{
                      sort: true,
                      categories: true,
                      radius: false,
                      date: false,
                    }}
                  />
                )
              }
            />
          }
        >
          <TaskList
            userRole={role}
            isMobile={isMobile}
            handleClickCloseButton={() => 2}
            handleClickConfirmButton={() => 3}
            handleClickMessageButton={() => 5}
            handleClickPnoneButton={() => 6}
            isStatusActive
            tasks={tasks}
          />
        </ContentLayout>
      }
    />
  );
}
