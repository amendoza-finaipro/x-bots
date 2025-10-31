import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error("Error al cargar datos", {
        description:
          error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.',
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context) => {
      toast.error("Error al realizar la acción", {
        description:
          error instanceof Error ? error.message : 'Ha ocurrido un error inesperado.',
      });
    },
  }),
});
