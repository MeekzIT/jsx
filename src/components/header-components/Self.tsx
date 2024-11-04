import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/slices/selfSlice";
import Loading from "../loading/Loading";
import CardSmall from "../cards/CardSmall";
import { Self } from "../../store/types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const SelfHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.self);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-box">
      <TransitionGroup component={null}>
        {data.map((i: Self) => (
          <CSSTransition key={i.id} timeout={2000} classNames="fade">
            <CardSmall data={i} image={i.SelfWashImages[0]} href="/self/" />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default SelfHeader;
