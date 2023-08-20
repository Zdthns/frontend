import { useState, MouseEvent, useRef, useEffect } from 'react';

import { useGetUsersQuery } from 'services/user-api';

import { SideMenuForAuthorized } from 'widgets/side-menu';
import { Filter } from 'features/filter/ui';
import { UserInfo } from 'entities/user';
import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

import styles from './styles.module.css';

export function RequestsVolunteersPage() {
  const [isFilterVisibel, setIsFilterVisibel] = useState(false);

  const buttonFilterRef = useRef<Element>();

  // данные о позиции кнопки вызова фильтра, на основе которых определяется позиция фильтра
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  // открытие фильтра и определение данных о позиции кнопки, вызвавшей фильтр
  const getButtonPosition = () => {
    const buttonRect = buttonFilterRef.current?.getBoundingClientRect();
    if (buttonRect) {
      setButtonPosition({ top: buttonRect.bottom, right: buttonRect.right });
    }
  };

  const openFilter = (e: MouseEvent) => {
    e.stopPropagation();
    buttonFilterRef.current = e.currentTarget;
    getButtonPosition();
    setIsFilterVisibel(!isFilterVisibel);
  };

  const { isLoading, data = [] } = useGetUsersQuery('volunteer', {
    pollingInterval: 30000,
  });

  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
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
            <>
              <SmartHeader
                filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
                filterText="Фильтр"
                onClick={openFilter}
                settingIcon={<Icon color="blue" icon="BlockIcon" size="54" />}
                settingText="Подтверждение / Блокировка"
              />

              {isFilterVisibel && (
                <Filter
                  userRole="admin"
                  changeVisible={() => setIsFilterVisibel(false)}
                  position={buttonPosition}
                />
              )}
            </>
          }
        >
          <PageSubMenuForAdmins />
          {isLoading ? (
            <Loader />
          ) : (
            <ul>
              {data.map((item: any) => {
                return (
                  <li key={item.data.id}>
                    <UserCard
                      avatarLink={item.data.avatar}
                      avatarName={item.data.fullname}
                      userName={item.data.fullname}
                      userId={item.data.id}
                      userNumber={item.data.phone}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </ContentLayout>
      }
    />
  );
}
