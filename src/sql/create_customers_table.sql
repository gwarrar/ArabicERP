-- إنشاء وظيفة SQL لإنشاء جدول العملاء
CREATE OR REPLACE FUNCTION create_customers_table_function()
RETURNS void AS $$
BEGIN
  -- التحقق من وجود الجدول
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'customers') THEN
    -- إنشاء الجدول إذا لم يكن موجودًا
    CREATE TABLE public.customers (
      id SERIAL PRIMARY KEY,
      customer_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      city TEXT,
      country TEXT,
      type TEXT,
      notes TEXT,
      status TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
    
    -- إنشاء مؤشر على customer_id
    CREATE INDEX idx_customers_customer_id ON public.customers(customer_id);
    
    -- إنشاء مؤشر على الاسم للبحث
    CREATE INDEX idx_customers_name ON public.customers(name);
    
    -- إضافة تعليق على الجدول
    COMMENT ON TABLE public.customers IS 'جدول العملاء';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- إنشاء وظيفة SQL لإنشاء جدول العملاء (الوظيفة التي يتم استدعاؤها من التطبيق)
CREATE OR REPLACE FUNCTION create_customers_table()
RETURNS void AS $$
BEGIN
  -- استدعاء وظيفة إنشاء الجدول
  PERFORM create_customers_table_function();
END;
$$ LANGUAGE plpgsql;
