// A mock function to mimic making an async request for data
export function fetchLogin(username: string, password: string) {
    return new Promise<{ data: boolean }>((resolve) =>
      setTimeout(() => resolve({ data: true }), 500)
    );
}
  