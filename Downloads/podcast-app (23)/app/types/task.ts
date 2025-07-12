/**
 * Task Status enumeration
 * Defines the possible states of a task
 */
export type TaskStatus = "To Do" | "In Progress" | "Done"

/**
 * Task Priority enumeration
 * Defines the priority levels for tasks
 */
export type TaskPriority = "Low" | "Medium" | "High" | "Critical"

/**
 * Main Task interface
 * Defines the structure of a task object with all required fields
 * Fulfills P2.41 - Descriptive and meaningful variable names
 */
export interface Task {
  /** Unique identifier for the task */
  id: string

  /** Task title - brief description of what needs to be done */
  title: string

  /** Detailed description of the task requirements and context */
  description: string

  /** Current status of the task */
  status: TaskStatus

  /** Priority level indicating urgency and importance */
  priority: TaskPriority

  /** Optional assignee - person responsible for completing the task */
  assignee?: string

  /** Optional due date for task completion */
  dueDate?: string

  /** Timestamp when the task was created */
  createdAt: string

  /** Timestamp when the task was last updated */
  updatedAt: string
}

/**
 * Task creation data interface
 * Used when creating new tasks (excludes system-generated fields)
 */
export type CreateTaskData = Omit<Task, "id" | "createdAt" | "updatedAt">

/**
 * Task update data interface
 * Used when updating existing tasks (excludes system fields)
 */
export type UpdateTaskData = Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
