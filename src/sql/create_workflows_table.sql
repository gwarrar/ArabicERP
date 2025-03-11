-- إنشاء وظيفة SQL لإنشاء جدول سير العمل
CREATE OR REPLACE FUNCTION create_workflows_table_function()
RETURNS void AS $$
BEGIN
  -- التحقق من وجود الجدول
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'workflows') THEN
    -- إنشاء الجدول إذا لم يكن موجودًا
    CREATE TABLE public.workflows (
      id SERIAL PRIMARY KEY,
      workflow_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      status TEXT,
      steps INTEGER,
      created_by TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      last_run TIMESTAMP WITH TIME ZONE,
      instances INTEGER DEFAULT 0
    );
    
    -- إنشاء مؤشر على workflow_id
    CREATE INDEX idx_workflows_workflow_id ON public.workflows(workflow_id);
    
    -- إنشاء مؤشر على الاسم للبحث
    CREATE INDEX idx_workflows_name ON public.workflows(name);
    
    -- إضافة تعليق على الجدول
    COMMENT ON TABLE public.workflows IS 'جدول سير العمل';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- إنشاء وظيفة SQL لإنشاء جدول سير العمل (الوظيفة التي يتم استدعاؤها من التطبيق)
CREATE OR REPLACE FUNCTION create_workflows_table()
RETURNS void AS $$
BEGIN
  -- استدعاء وظيفة إنشاء الجدول
  PERFORM create_workflows_table_function();
END;
$$ LANGUAGE plpgsql;
