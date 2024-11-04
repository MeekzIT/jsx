import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchData } from "../../store/slices/equipmentSlice";
import Loading from "../loading/Loading";
import { Equipment } from "../../store/types";
import CardSmall from "../cards/CardSmall";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const EquipmentHeader = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.equip);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-box">
      <TransitionGroup component={null}>
        {data.map((i: Equipment) => (
          <CSSTransition key={i.id} timeout={2000} classNames="fade">
            <CardSmall
              key={i.id}
              data={i}
              image={i.EquipmentImages[0]}
              href="/equipment/"
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default EquipmentHeader;
