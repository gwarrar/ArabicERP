-- إنشاء وظيفة SQL لإنشاء جدول قوالب سير العمل
CREATE OR REPLACE FUNCTION create_workflow_templates_table_function()
RETURNS void AS $$
BEGIN
  -- التحقق من وجود الجدول
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'workflow_templates') THEN
    -- إنشاء الجدول إذا لم يكن موجودًا
    CREATE TABLE public.workflow_templates (
      id SERIAL PRIMARY KEY,
      template_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      steps INTEGER,
      created_by TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      usage_count INTEGER DEFAULT 0,
      rating NUMERIC(3,1) DEFAULT 0,
      is_favorite BOOLEAN DEFAULT false,
      tags TEXT[]
    );
    
    -- إنشاء مؤشر على template_id
    CREATE INDEX idx_workflow_templates_template_id ON public.workflow_templates(template_id);
    
    -- إنشاء مؤشر على الاسم للبحث
    CREATE INDEX idx_workflow_templates_name ON public.workflow_templates(name);
    
    -- إضافة تعليق على الجدول
    COMMENT ON TABLE public.workflow_templates IS 'جدول قوالب سير العمل';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- إنشاء وظيفة SQL لإنشاء جدول قوالب سير العمل (الوظيفة التي يتم استدعاؤها من التطبيق)
CREATE OR REPLACE FUNCTION create_workflow_templates_table()
RETURNS void AS $$
BEGIN
  -- استدعاء وظيفة إنشاء الجدول
  PERFORM create_workflow_templates_table_function();
END;
$$ LANGUAGE plpgsql;
