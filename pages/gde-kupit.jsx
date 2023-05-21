// gde-kupit.jsx
import { useTheme, useMediaQuery } from "@mui/material";
import DifferentMaps from "../src/components/Map/DifferentMaps";
import HorizontTabsGde from "../src/components/Auxiliary/HorizontTabsGde";
import VerticalTabsGde from "../src/components/Auxiliary/VerticalTabsGde";

const Gdekupit = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (st) => {
    const tabs = [
      {
        title: "Карта торфяных карьеров",
        content: (
          <div>
            <DifferentMaps st={st} idTab={1} />
          </div>
        ),
      },
      {
        title: "Карта производителей винтовых свай",
        content: (
          <div>
            <DifferentMaps st={st} idTab={2} />
          </div>
        ),
      },
      {
        title: "Карта производителей черного металлопроката",
        content: (
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            perspiciatis enim voluptatum quibusdam ullam? Porro, reiciendis.
            Eveniet ea, perferendis, excepturi amet doloribus quisquam commodi
            veritatis reiciendis dolor itaque, minus incidunt.Lorem ipsum dolor
            sit amet consectetur, adipisicing elit. Suscipit perspiciatis enim
            voluptatum quibusdam ullam? Porro, reiciendis. Eveniet ea,
            perferendis, excepturi amet doloribus quisquam commodi veritatis
            reiciendis dolor itaque, minus incidunt.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Suscipit perspiciatis enim voluptatum
            quibusdam ullam? Porro, reiciendis. Eveniet ea, perferendis,
            excepturi amet doloribus quisquam commodi veritatis reiciendis dolor
            itaque, minus incidunt.Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Suscipit perspiciatis enim voluptatum quibusdam
            ullam? Porro, reiciendis. Eveniet ea, perferendis, excepturi amet
            doloribus quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus
            incidunt.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Suscipit perspiciatis enim voluptatum quibusdam ullam? Porro,
            reiciendis. Eveniet ea, perferendis, excepturi amet doloribus
            quisquam commodi veritatis reiciendis dolor itaque, minus incidunt.
          </div>
        ),
      },
    ];
    return tabs;
  };

  return (
    <div>
      {isMatch ? (
        <VerticalTabsGde tabs={HorOrVer("mapStyleVerticalTabs")} />
      ) : (
        <HorizontTabsGde tabs={HorOrVer("mapStyleHorizonTabs")} />
      )}
    </div>
  );
};

export default Gdekupit;
