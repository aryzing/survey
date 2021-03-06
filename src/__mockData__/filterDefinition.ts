// eslint-disable-next-line import/prefer-default-export
export const filterDefinition = {
  demographics: [
    {
      name: "gender",
      display: "Gender",
      options: [
        {
          name: "male",
          display: "Male",
        },
        {
          name: "female",
          display: "Female",
        },
        {
          name: "other",
          display: "Other",
        },
      ],
    },
    {
      name: "home_region",
      display: "Home Region",
      options: [
        {
          name: "east_midlands",
          display: "East Midlands",
        },
        {
          name: "east_of_england",
          display: "East of England",
        },
        {
          name: "london",
          display: "London",
        },
        {
          name: "north_east",
          display: "North East",
        },
        {
          name: "north_west",
          display: "North West",
        },
        {
          name: "scotland",
          display: "Scotland",
        },
        {
          name: "south_west",
          display: "South West",
        },
        {
          name: "wales",
          display: "Wales",
        },
      ],
    },
    {
      name: "relationship_status",
      display: "Relationship Status",
      options: [
        {
          name: "single",
          display: "Single",
        },
        {
          name: "married",
          display: "Married",
        },
      ],
    },
  ],
};
