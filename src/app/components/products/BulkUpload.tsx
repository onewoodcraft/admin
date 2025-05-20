const products = (jsonData || []).map((item: any) => ({
  images: item.images ? item.images.split(',').map((url: string) => url.trim()) : [],
})) 