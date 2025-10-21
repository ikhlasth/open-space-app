import React, { useEffect } from 'react';
import TalkInput from '../components/TalkInput';
import TalksList from '../components/TalksList';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUserAndTalks } from '../states/shared/action';
import { asyncAddTalk, asyncToggleLikeTalk } from '../states/talks/action';

function HomePage() {
  const {
    talks = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUserAndTalks());
  }, [dispatch]);

  const onAddTalk = (text) => {
    dispatch(asyncAddTalk({ text }));
  };

  const onLike = (id) => {
    dispatch(asyncToggleLikeTalk(id));
  };

  const talkList = talks.map((talk) => ({
    ...talk,
    user: users.find((user) => user.id === talk.user),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <TalksList talks={talkList} like={onLike} />
    </section>
  );
}

export default HomePage;
