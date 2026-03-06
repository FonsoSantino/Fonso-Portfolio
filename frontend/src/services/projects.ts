import api from '@/lib/axios';

export interface Project {
    id: string;
    title: string;
    description?: string;
    link?: string;
    tags: string[];
    priority: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    metadata_json?: any;
}

export interface ProjectCreate {
    title: string;
    description?: string;
    link?: string;
}

export const projectsService = {
    getAll: async (): Promise<Project[]> => {
        const response = await api.get<Project[]>('/projects/');
        return response.data;
    },
    create: async (data: ProjectCreate): Promise<Project> => {
        const response = await api.post<Project>('/projects/', data);
        return response.data;
    },
    update: async (id: string, data: Partial<ProjectCreate>): Promise<Project> => {
        const response = await api.put<Project>(`/projects/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/projects/${id}`);
    },
};
