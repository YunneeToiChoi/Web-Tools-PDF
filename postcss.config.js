module.exports = {
    plugins: {
        'postcss-import': {}, //cho phép các tệp css import
        'tailwindcss/nesting': 'postcss-nesting',//Xử lí các nhóm css
         tailwindcss: {},//Cung cấp class tailwindcss
         autoprefixer: {},//Xử lí tiền tố của phù hợp với trình duyệt
         'postcss-preset-env': {
            features: { 'nesting-rules': false }, //Tương thích với cấc trình duyệt cũ và tắt xử lí nhóm css vì đã xử lí ở trên rồi
          },
          ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})// Nén tối ưu tài nguyên bằng cssnano
    }
  }