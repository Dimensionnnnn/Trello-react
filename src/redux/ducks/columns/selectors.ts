import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Column } from "types/types";

const selectColumns = (state: RootState) => state.columns;

export const getColumns = createSelector(
    selectColumns,
    (columns: Record<string, Column>) => columns
)