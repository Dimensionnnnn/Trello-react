import { createSelector } from '@reduxjs/toolkit';
import { Column } from 'types/types';

import { RootState } from '../../store';

const selectColumns = (state: RootState) => state.columns;

export const getColumns = createSelector(
    selectColumns,
    (columns: Record<string, Column>) => columns,
);
