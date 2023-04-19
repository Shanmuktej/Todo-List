import { signal } from "@preact/signals-react";
import { Navbar, ToggleButton } from "react-bootstrap";
import { setFilteredTodos } from "./Todos";

export type FilterTypes = "All" | "Past" | "Today" | "Future";

const filters: Array<FilterTypes> = ["All", "Past", "Today", "Future"];

export const selectedFilter = signal<FilterTypes>("All");

function onFilterSelect(filter: FilterTypes) {
  selectedFilter.value = filter;
  setFilteredTodos(filter);
}

const Filters = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls='filters' />
      <Navbar.Collapse id="filters" style={{ flexDirection: 'column' }} >
        {filters.map((filter: any) => (
          <ToggleButton key={filter} id={filter} type="radio" variant="" value={filter} size="lg" className="filter d-grid mt-4"
            checked={selectedFilter.value == filter} onClick={() => onFilterSelect(filter)}
          >
            {filter}
          </ToggleButton>
        ))}
      </Navbar.Collapse>
    </Navbar >
  );
};

export default Filters;
