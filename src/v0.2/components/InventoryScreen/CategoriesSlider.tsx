import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import ChipCategory from "../../../v0.1/components/common/ChipCategory";
import customStyles from "../../../v0.1/styles/customStyles";

interface Props {
  itemCategories: any;
}

const { mainColor } = customStyles;

const VER_TODOS = {
  id: "123",
  name: "Ver Todos",
};

const CategoriesSlider = ({ itemCategories }: Props) => {
  const [selected, setSelected] = useState(VER_TODOS.id);

  const handleSelect = (category: any) => {
    setSelected(category.id);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ChipCategory
          key={VER_TODOS.id}
          name={VER_TODOS.name}
          containerStyle={VER_TODOS.id === selected ? mainColor : "#f9f9f9"}
          textStyle={VER_TODOS.id === selected ? "white" : mainColor}
          onPress={() => handleSelect(VER_TODOS)}
        />

        {itemCategories?.map((category: any) => (
          <ChipCategory
            key={category.id}
            name={category.name}
            containerStyle={category.id === selected ? mainColor : "#f9f9f9"}
            textStyle={category.id === selected ? "white" : mainColor}
            onPress={() => handleSelect(category)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoriesSlider;
