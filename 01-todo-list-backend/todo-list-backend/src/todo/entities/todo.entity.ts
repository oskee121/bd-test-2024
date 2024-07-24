export class Todo {
  id: string;
  title: string;
  favorites?: boolean;
  scheduledTime?: string;
  notes?: string;
  createdAt: string;
  order: number;
}
