type ICreateScheduleDTO = Array<{
  teacher_id?: string;
  day_id: number;
  from: number;
  to: number;
}>;

export { ICreateScheduleDTO };
