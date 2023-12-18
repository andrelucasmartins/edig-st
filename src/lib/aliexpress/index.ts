export async function aliexpressFetch<T>(
  productId: string | number,
): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(
      `https://feedback.aliexpress.com/pc/searchEvaluation.do?productId=${productId}&lang=pt_BR&country=BR&page=1&pageSize=3&filter=all&sort=complex_default`,
      {
        method: "GET",
      },
    );

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.stack || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}
